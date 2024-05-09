interface GoogleBooksVolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  industryIdentifiers: { type: string; identifier: string }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface GoogleBooksApiItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: GoogleBooksVolumeInfo;
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
}

export interface GoogleBooksApi {
  kind: string;
  totalItems: number;
  items: GoogleBooksApiItem[];
}

export interface BookCover {
  url: string;
}

export interface LibraryOfCongressBooksApi {
  "zs:searchRetrieveResponse": {
    "zs:records": {
      "zs:record": {
        "zs:recordData": {
          mods: {
            titleInfo: {
              title: string;
            };
            name: LocBookInfo[];
            originInfo: LocPublisherInfo[] | LocPublisherInfo;
            abstract?: string; // blurb; includes: "-- Provided by publisher."
          };
        };
      };
    };
  };
}

type LocBookInfo = {
  namePart: string | string[];
  role: {
    roleTerm: string; // author, translator
  };
};

export type LocPublisherPlace = {
  placeTerm: string; // example: 'nyu" or 'Yonkers :'
};

export interface LocPublisherInfo {
  place: LocPublisherPlace[] | LocPublisherPlace;
  agent?: {
    namePart: string; // example: "St Vladimir's Seminary Press,"
    role: {
      roleTerm: string; //example: "publisher"
    };
  };
  dateIssued: number | string;
  issuance?: string;
  edition?: string;
}
