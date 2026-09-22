// Article Registry for The Silicon Wire
//
// This file used to hold every article's content directly. It doesn't
// anymore — ALL stories now live as individual .json files in the
// /stories/ folder at the repo root, and site.js loads them at page load
// by asking GitHub's API what's in that folder.
//
// These two variables just need to exist so site.js has something to fill
// in — leave them empty. To add, edit, or remove a story, work in
// /stories/ instead of here.
const articles = {};
const articleOrder = [];
