import { TRPCError } from "@trpc/server";
import { XMLParser } from "fast-xml-parser";

import {
  type LocPublisherInfo,
  type BookCover,
  type GoogleBooksApi,
  type LibraryOfCongressBooksApi,
  type LocPublisherPlace,
} from "./types";

const xmlParser = new XMLParser();

export async function isbnSearch(input: { isbn: string }) {
  // first get basic book info via google
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}`;

  const response = await fetch(url);
  const data = (await response.json()) as GoogleBooksApi;
  const book = data.items[0];

  if (!book) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Could not find book with the ISBN provided.",
    });
  }

  // next get publisher info via library of congress
  const publisherUrl = `http://lx2.loc.gov:210/lcdb?version=1.1&operation=searchRetrieve&query=bath.isbn=${input.isbn}&maximumRecords=1&recordSchema=mods`;
  const publisherResponse = await fetch(publisherUrl);

  const publisherData = await publisherResponse.text();
  const parsedPublisherData = xmlParser.parse(
    publisherData,
  ) as LibraryOfCongressBooksApi;
  const publicationInfo =
    parsedPublisherData["zs:searchRetrieveResponse"]["zs:records"]["zs:record"][
      "zs:recordData"
    ].mods;

  console.log(publicationInfo);

  const bookBlurb = publicationInfo.abstract;

  function publisherInfo() {
    const isPublisherAnArray = Array.isArray(publicationInfo.originInfo);
    const publicationInfoArray =
      publicationInfo.originInfo as LocPublisherInfo[];

    if (isPublisherAnArray) {
      // returns array including items with publisher's name
      const publisherArray = publicationInfoArray
        .filter((item) => {
          return item.agent?.namePart;
        })
        .filter((x) => x);

      // returns array including items with publisher's city
      const publicationCityArray = publicationInfoArray
        .filter((item) => {
          return item.agent && item.place;
        })
        .filter((x) => x);

      const publisher = publisherArray[0]?.agent?.namePart;

      // because publicationCityArray[0]?.place can be either LocPublisherPlace or an array of it,
      // we must check if it is an array before returning publicationCity info.
      function cityInfoIfArray() {
        const CityArray = publicationCityArray[0]?.place as LocPublisherPlace[];
        const isPublicationCityAnArray = Array.isArray(
          publicationCityArray[0]?.place,
        );

        if (isPublicationCityAnArray) {
          // return city name if .place is an array
          const publicationCity = CityArray[1]?.placeTerm;
          return publicationCity;
        }

        const cityObject = publicationCityArray[0]?.place as LocPublisherPlace;

        // return city name if .place is not an array
        const publicationCity = cityObject.placeTerm;
        return publicationCity;
      }

      const publicationCity = cityInfoIfArray();

      return { publisher, publicationCity };
    }

    const publicationInfoObject =
      publicationInfo.originInfo as LocPublisherInfo;
    const isPublicationCityAnArray = Array.isArray(publicationInfoObject.place);

    function cityInfoIfNotArray() {
      const CityArray = publicationInfoObject.place as LocPublisherPlace[];

      if (isPublicationCityAnArray) {
        const publicationCity = CityArray[1]?.placeTerm;
        return publicationCity;
      }

      const cityObject = publicationInfoObject.place as LocPublisherPlace;

      const publicationCity = cityObject.placeTerm;
      return publicationCity;
    }

    const publisher = publicationInfoObject.agent?.namePart;
    const publicationCity = cityInfoIfNotArray();

    return { publisher, publicationCity };
  }

  const { publisher, publicationCity } = publisherInfo();

  // search for book cover url after finding book:
  const coverIsbn =
    input.isbn.length === 13 && input.isbn.includes("978")
      ? `978-${input.isbn.substring(3)}` // if ISBN-13, add hiphen after 978
      : `978-${input.isbn}`; // if ISBN-10, add 978- before number

  const coverUrl = `http://bookcover.longitood.com/bookcover/${coverIsbn}`;
  const coverResponse = await fetch(coverUrl);
  const coverData = (await coverResponse.json()) as BookCover;

  return {
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    blurb: bookBlurb,
    coverImage: coverData.url,
    publisher: publisher,
    publicationYear: book.volumeInfo.publishedDate,
    publicationCity: publicationCity,
  };
}
