# CKEditor Image Load/Paste Plugin

Permits loading, pasting, and publishing small images directly into the editor, without hosting elsewhere, using dataURL feature.

If using within [Elgg](https://elgg.org/) framework, also install [Elgg-Allow-Data-Images](https://github.com/themanyone/Elgg-Allow-Data-Images) plugin.

Copyright &copy; 2019 Henry Kroll III. See LICENSE.txt for details. -- henry @ [thenerdshow.com](https://thenerdshow.com/)

## Load or past small icons, unique emojis directly into editor.

Try it out using our voice controlled HTML editor at [https://thenerdshow.com/edit.html](https://thenerdshow.com/edit.html).

Our online editor saves work periodically, so you can shut down and continue at any time.

## Other sites using Image Load/Paste Plugin

### [fails.us](https://fails.us) - Voice-operated web design, social media, and search.

* "Everything" mentioned on fails.us *becomes searchable* at *[everything.fails.us](http://everything.fails.us)*.
* Blogs mentioning Trump appear at [trump.fails.us](http://Trump.fails.us) and [trump.isawesome.cf](http://Trump.isawesome.cf).
* Our [everything.fails.us](http://everything.fails.us) searchlinks are clickable on Twitter without URL shorteners.
* Sign up via Twitter and check the box to echo postings to Twitter.

> Fails.us searchlinks are automatically mirrored to these other great domains.

* [yourbrand.eq2.us](http://yourbrand.eq2.us)
* [yourbrand.fails.us](http://yourbrand.fails.us)
* [yourbrand.talkback.tk](http://yourbrand.talkback.tk)
* [yourbrand.bartertown.tk](http://yourbrand.bartertown.tk)
* [yourbrand.onaboat.tk](http://yourbrand.onaboat.tk)
* [yourbrand.equal.cf](http://yourbrand.equal.cf)
* [yourbrand.equalto.cf](http://yourbrand.equalto.cf)
* [yourbrand.equals.cf](http://yourbrand.equals.cf)
* [yourbrand.isawesome.cf](http://yourbrand.isawesome.cf)
* [yourbrand.isfine.cf](http://yourbrand.isfine.cf)
* [yourbrand.likesthis.cf](http://yourbrand.likesthis.cf)
* [yourbrand.likethis.cf](http://yourbrand.likethis.cf)
* [yourbrand.withgoats.cf](http://yourbrand.withgoats.cf)
* [yourbrand.inabox.cf](http://yourbrand.inabox.cf)
* [yourbrand.withafox.cf](http://yourbrand.withafox.cf)

# Installation

## For an [Elgg](https://elgg.org/) installation.

Put this project's files in a folder called "paste_image" inside the 
[CKEditor-4](https://ckeditor.com/ckeditor-4/download/)  
"plugins" directory.

```
/my-www-root/my-website.com/vendor/elgg/elgg/mod/ckeditor/vendors/ckeditor/plugins/paste_image/
```
Edit config.js

```
/my-www-root/my-website.com/vendor/elgg/elgg/mod/ckeditor/views/default/elgg/ckeditor/config.js
```

Add `paste_image` to the line that says `extraPlugins`.

```
extraPlugins: 'open_save,paste_image,speech',
```

### Optional [CKEditor Addons](https://github.com/hypeJunction/Elgg-ckeditor_addons) plugin 
for [Elgg](https://elgg.org/).

[CKEditor Addons](https://github.com/hypeJunction/Elgg-ckeditor_addons) 
permits turning CKEditor menu items on and off and permits reserving 
some functions for admin users.

We have to modify `setup.js.php` to make paste_image work 
with the optional CKEditor Addons plugin. Remove `views.php` if 404 errors show up in the webserver logs complaining about a missing `ckeditor/assets/` directory. Change start.php:

Modify setup.js.php:

```
/my-www-root/my-website.com/mod/ckeditor_addons/views/default/components/ckeditor/setup.js.php
```

Add `paste_image` to the line that says `extraPlugins`. 

## For any other website.

You must have [CKEditor-4](https://ckeditor.com/ckeditor-4/download/) 
already working. This plugin targets version 4.11.x.

Put this project's files in a folder called "paste_image" inside CKEditor's 
"plugins" directory.

```
/my-www-root/my-website.com/ckeditor/plugins/paste_image
```
