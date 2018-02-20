import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from 'draft-js-buttons';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

export default createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
  ],
});
