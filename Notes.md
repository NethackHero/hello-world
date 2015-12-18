JSON
GitHub: twitch-json.js 
in Hello-world
Problems we are currently facing:

===========================
Next:
Make the buttons look like tabs instead of buttons.

apply bootstrap: http://getbootstrap.com/components/#nav-tabs

===========================
Do later/On the way:

If twitch account has been closed and no longer available as a channel in the array, we should display that the channel has been closed. <--- Still figuring this out

Reconsider:
Start centering the elements. -- considering design

Consider changing the call to firstly collect the information from the channel JSON, then check whether they are offline or online from the stream JSON.
Change to use channel instead of stream to get logo, and information like that. //decided not to do this switch, because we have to call the JSON for stream anyways to check for online/offline, and we will actually be saving an extra JSON call if the stream was online (this will depend how heavy on the system per call is. A benefit however, is that it may be less code, and code that is more easily understandable.

===========================
Tighten up the outer container.  (Margins)

included bootstrap links and added div containers to search and channel loading sections.

UI time, starting with the container, border, title.
First create a css file and link it to the html. 

What we did previously:
We finished the entire search function of the app.

Get the search function to work, first without having to type into the text box (using a declared variable)

Start the search, start with creating a text box with a button.

Display more information on the HTML from the channel objects.

Figure out the bug, the problem is not because that you were calling from within, since it doesn't work when calling just from outside and not calling the other. Refer to github for the original version if things mess up!

We also figured out how to do a pause/delay, since even though we had do an if statement for the last channel in the array, it still was faster than some other channels to load up.

We made the function called displaychannels - which basically takes an array of objects and uses to clear the html and then display whatever is in the objects through appending.

Once we have extracted the information, we can replace the display from that of the objects instead.

We added more information into the arrays of objects. whats streaming, logo, online/offline, link to stream

We are trying to get the buttons to list different channels according to their status.
try: seperate the online and offline by putting them into an array of objects
then: try activating the functions after finish loading channels
do this by implementing the use of the index

make 3 arrays, all, online, offline.
Get those buttons responding.

See additional details. What are they streaming? Name of the channel? Logo picture?
If more time, we start to figure out how to seperate then according to their status as "Online" or "Offline" at a command of a button or two. Start by making three buttons, one for 'all', one 'online', one 'offline'.

We printed out whether the channel is on/offline. We are also able to attain the link and print it out if channel is online.

We have established the ability to take two different links of JSON data



