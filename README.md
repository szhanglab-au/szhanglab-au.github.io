# Zhang Lab website

Lab homepage for Dr. Shungeng Zhang's group at the School of Computer and Cyber Sciences, Augusta University.

## Files

```
index.html               page layout and styling (rarely needs editing)
data.js                  news, students and publications (edit this)
assets/pi.jpg            PI photo
assets/logo.svg          lab logo, also used as the browser icon
assets/logo-horizontal.svg  logo with wordmark, for slides and posters
```

## Updating the site

Almost every update only touches `data.js`. Add new items at the top of each list, keep the commas between items, then commit and push. GitHub Pages republishes within a minute or two.

**New paper acceptance** (add to `NEWS`):

```js
{date:"2027", type:"paper", student:"Jing Zou", title:"Paper title", venue:"CVPR 2027", tag:"new", label:"New"},
```

Remove `tag` and `label` from the previous "New" item so only the latest one carries the badge. For awards use `tag:"award", label:"Best Paper"`.

**Workshop or poster** (add to `NEWS`):

```js
{date:"Mar 3, 2027", type:"workshop", student:"Prajwal Basnet", title:"Poster title", venue:"XYZ Workshop 2027"},
```

**Publication** (add to `PUBS`; workshops are not listed here):

```js
{y:2027, k:"conf", t:"Paper title", a:"Jing Zou, Shungeng Zhang, Meikang Qiu", v:"Conference name (<b>CVPR 2027</b>)", url:"https://doi.org/..."},
```

`k` is `"conf"` or `"jour"`. Names listed in `STUDENTS` are underlined automatically. `url` and `award` are optional.

**New student** (add to `STUDENTS`):

```js
{name:"New Student", since:"Fall 2027", topics:"Research topics", photo:"assets/new-student.jpg"},
```

`photo` is optional; initials are shown without it. Put photos in `assets/` (square, about 200×200 px).

Other text (research description, grants, contact info) lives directly in `index.html`; search for the text you want to change.

## Preview locally

Open `index.html` in a browser. After editing `data.js`, refresh the page. If the page goes blank, a comma or quote is usually missing in `data.js`; the browser console (F12) shows the line.
