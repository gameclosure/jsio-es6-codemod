// Should convert
// ---- ----

// Single import
import device;

// Single relative import
import .View;

// Note: Single imports are imported with breadcrumb:
// https://github.com/gameclosure/timestep/blob/664ac57cfede56923f8c2e181652a8f065059fff/src/platforms/browser/MobileBrowserAPI.js#L24
// This means these should warn (no transform).  A separate mod will be needed
// to convert all references to the full path
import lib.PubSub;
import ...ui.keyboardTypes;
import .layout.BackingExtension;

// Single import with rename
import ui.View as View;
import lib.PubSub as PubSub;
import event.input.keys as keyConstants;

// Selective imports
from util.browser import $;

// Import as export
import Sound as exports;
import ..CellView as exports;
import .InputEvent as exports.InputEvent;



// ---- ----
// Should warn: multiple args
jsio('import ObjectPool', { supressErrors: true });

var doDynamicImport = function () {
  // Should warn: top level
  jsio('import Timer');
};
