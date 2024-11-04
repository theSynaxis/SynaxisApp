"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { parseHtml } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./card";
import {
  OF_CHRIST_AND_THEOTOKOS,
  GREAT_SAINTS_DAY,
  SAINT_WITH_GREAT_DOXOLOGY,
  SAINT_WITH_SERVICE,
  SIMPLE_COMMEMORATION,
} from "~/lib/constants";

const placeholder = "Enter some rich text...";
const Theme = {
  code: "editor-code",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  image: "editor-image",
  link: "editor-link",
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  paragraph: "editor-paragraph",
  placeholder: "editor-placeholder",
  quote: "editor-quote",
  rtl: "rtl",
  text: {
    bold: "editor-text-bold",
    code: "editor-text-code",
    hashtag: "editor-text-hashtag",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "editor-text-strikethrough",
    underline: "editor-text-underline",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
  },
};

const editorConfig = {
  namespace: "Synaxis WYSIWYG",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: Theme,
};

interface TextEditorProps {
  previewHeader: string;
  onChange: (...event: unknown[]) => void;
}

export const TextEditor = forwardRef((props: TextEditorProps) => {
  const { previewHeader, onChange } = props;
  const [htmlEditorText, setHtmlEditorText] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: string) => {
    onChange(e);
    return setHtmlEditorText(e);
  };

  const userInput = parseHtml(`${htmlEditorText}`);

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className={`editor-container ${showPreview ? "hidden" : ""}`}>
          <ToolbarPlugin previewMethod={{ showPreview, setShowPreview }} />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <CustomOnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
      <div className={`${showPreview ? "" : "hidden"}`}>
        <TextPreview
          header={previewHeader}
          life={userInput}
          icon={
            "https://images.oca.org/icons/sm/november/1104.seraphim.samoilovich.jpg"
          }
          feastType="SAINT_WITH_GREAT_DOXOLOGY"
          previewMethod={{ showPreview, setShowPreview }}
        />
      </div>
    </>
  );
});

TextEditor.displayName = "Lexical Text Editor";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}
interface ToolbarProps {
  previewMethod: {
    showPreview: boolean;
    setShowPreview: Dispatch<SetStateAction<boolean>>;
  };
}

function ToolbarPlugin(props: ToolbarProps) {
  const { previewMethod } = props;
  const { showPreview, setShowPreview } = previewMethod;
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar flex items-center justify-between" ref={toolbarRef}>
      <span className="flex">
        <span
          // disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <i className="format undo" />
        </span>
        <span
          // disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <i className="format redo" />
        </span>
        <Divider />
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          className={"toolbar-item spaced " + (isBold ? "active" : "")}
          aria-label="Format Bold"
        >
          <i className="format bold" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          className={"toolbar-item spaced " + (isItalic ? "active" : "")}
          aria-label="Format Italics"
        >
          <i className="format italic" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
          aria-label="Format Underline"
        >
          <i className="format underline" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
          aria-label="Format Strikethrough"
        >
          <i className="format strikethrough" />
        </span>
        <Divider />
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          className="toolbar-item spaced"
          aria-label="Left Align"
        >
          <i className="format left-align" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          className="toolbar-item spaced"
          aria-label="Center Align"
        >
          <i className="format center-align" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className="format right-align" />
        </span>
        <span
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          className="toolbar-item"
          aria-label="Justify Align"
        >
          <i className="format justify-align" />
        </span>
        <Divider />
      </span>
      <span>
        <span
          onClick={() => setShowPreview(!showPreview)}
          className="toolbar-item"
          aria-label="View Preview"
        >
          Preview
        </span>
      </span>
    </div>
  );
}

function CustomOnChangePlugin(props: {
  onChange: (html: string) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const html = $generateHtmlFromNodes(editor, null);
        onChange(`${html}`);
      });
    });
  }, [onChange, editor]);

  return null;
}

interface PreviewProps {
  header: string;
  life: string | JSX.Element | JSX.Element[];
  icon: string;
  feastType: FeastType;
  previewMethod: {
    showPreview: boolean;
    setShowPreview: Dispatch<SetStateAction<boolean>>;
  };
}
type FeastType =
  | typeof OF_CHRIST_AND_THEOTOKOS
  | typeof GREAT_SAINTS_DAY
  | typeof SAINT_WITH_GREAT_DOXOLOGY
  | typeof SAINT_WITH_SERVICE
  | typeof SIMPLE_COMMEMORATION;

function TextPreview(props: PreviewProps) {
  const { header, icon, life, feastType, previewMethod } = props;
  const { showPreview, setShowPreview } = previewMethod;

  function iconType(feastType: FeastType) {
    switch (feastType) {
      case OF_CHRIST_AND_THEOTOKOS:
        return "/images/icons/Book-Gold-Icon.svg"; // TODO: ChiRo icon
      case GREAT_SAINTS_DAY:
        return "/images/icons/Calendar-Gold-Icon.svg"; // TODO: Elaborate cross icon
      case SAINT_WITH_GREAT_DOXOLOGY:
        return "/images/icons/Chat-Gold-Icon.svg"; // TODO: Big cross icon
      case SAINT_WITH_SERVICE:
        return "/images/icons/Home-Gold-Icon.svg"; // TODO: Simple cross icon
      case SIMPLE_COMMEMORATION:
        return "/images/icons/Dot-Filled-Icon.svg"; // TODO: change color to synaxis red
      default:
        return "/images/icons/Dot-Filled-Icon.svg";
    }
  }
  return (
    <>
      <Card className="w-full border border-neutral-300 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between text-xl">
          <Link
            href="/apps/lives/app/saints/saint"
            className="flex flex-row items-center justify-between gap-2"
          >
            <Image
              src={iconType(feastType)}
              alt="Minor Saint"
              className={`h-4 w-4 cursor-pointer`}
              width={16}
              height={16}
            />
            {header}
          </Link>

          <span>
            <span
              onClick={() => setShowPreview(!showPreview)}
              className="ring-offset-background focus-visible:ring-ring hover:boxShadow-lg inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary-gold-500 px-4 py-2 text-lg font-medium text-neutral-900 transition transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Show Editor
            </span>
          </span>
        </CardHeader>
        <CardContent className="flex flex-row items-start justify-around gap-8 text-2xl">
          <Image
            src={icon}
            alt="St Silouan The Athonite"
            width={140}
            height={200}
          />

          <span className="w-4/5">
            {life ?? "There is no record for this saint."}
          </span>
        </CardContent>
      </Card>
    </>
  );
}
