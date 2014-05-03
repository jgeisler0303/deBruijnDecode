De Bruijn Sequence Decoding
==============
Generate de Bruijn sequences with efficient decoding algorithms due to J. Tuliani.
There is really a lot about these sequences and especially in J. Tuliani's Thesis. Therefore I refrain from further explanations at this point.
The generator and decoder are written in javascript. A simple html page is supplied to demonstrate the functions.

This guy did the same in Python: https://github.com/alexbowe/debdec

Here is another javascript implementation, but (as far as I can tell) they are not optimized for efficient decoding: https://github.com/substack/de-bruijn

The ultimate goal is to automatically generate C code for a decoder to be run on an embedded controller.

