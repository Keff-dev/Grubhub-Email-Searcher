# Grubhub-Email-Searcher
Logs grubhub email prices, items, locations, and dates where orders took place into a Google Spreedsheet. Originally coded on Google App Script.
This could easily be used for any easy scraping abilities if you play around with some things. The labels itself are pretty easy to change in the code. Below is more in depth portions for what to change!

## How it works
The scraper checks for a label like "Dining Dollar expenses (Grubhub)" in your email inbox. 

[![email-label-ex.png](https://i.postimg.cc/yN5ZQKNR/email-label-ex.png)](https://postimg.cc/JyN009Z7)

When it finds it, it grabs the plain text version of every email with that label. Once it has it, it separates the whole email's lines into an array.  Since Grubhub's email is pretty bare-bones, I didn't need to have the full HTML version of it to parse it. Once in that array, it checks what each of those lines starts with.

In this code, if a line starts with "1 x ", "Total: " or "Shop: ", it will save it to its corresponding arrays (items, prices, shops, etc). The reason it checks for those was because the eamail and plain Body text looked like this:

[![email-2-plain-body-ex.png](https://i.postimg.cc/9M1TV9m6/email-2-plain-body-ex.png)](https://postimg.cc/r00zNKtj)

So once it finishes parsing & removing extra parts like the ": $3.95" from Hot Chocolate, it directs those arrays to the function that puts the data onto the spreadsheet. Although that function doesn't *split* the data, it is still called splitGrubData(), because that function grabs the spreadsheet the app is connected to, selects all the rows in a column (starting from the second), and then puts the data into each row. So the final table winds up looking like this:

[![Formatted-table.png](https://i.postimg.cc/Qd5TCwNk/Formatted-table.png)](https://postimg.cc/68W31Hvy)

*Note: The S'More's cake was bought with the Quesadilla combo above it, so it doesn't need the data repeated.*

## How to change this code to your needs
Putting this here, because right before I started coding this, I'd hoped to find something like it, and well... I either didn't look hard enough or didn't feel like understanding how to change someone else's code to fit my needs better. I've done it before, but I guess I just didn't feel like it this time around. So you're in luck! It should be pretty simple to do, if you understand code but don't wanna rework all the logic.

1. **Email label linking**
  - Make sure that all the emails you want to get the data from are under the same label.
  - Copy that label's name and paste it between the quotes that say `Dining Dollar expenses (Grubhub)`. It'll be on line 9
2. **Plain Body Logic**
  - Add a line that says `Logger.log(body);` before line 26 to see what you're looking at.
  - Find the lines with the data you want to store.
  - Change the regex variables that'll remove everything except the data you want.
    - If you want only numbers, `/[^0-9]/g` 
    - Nothing but the text, `/ text /g`
      - {Then it'll find all the spots that have 'text'}
    - [Test your regexes here](https://regex101.com/), if you must.
  - Change the `.startsWith()` functions to whatever the plain body lines of the data you want to start with.
  - Either change or leave the `.getDate()` depending on if you want that.
3. **Spreadsheet Logic**
    - Make a spreadsheet if you don't have one for this already.
    - Label the A1:D1 rows with your table headers.
    - Go to *Extentions*, *App Scripts* and it'll open up a little thang.
    - Paste the code git into that or fork it or however you wanna connect.
    - It'll ask for permissions and stuff, (it did for me too), accept them and proceed anyway.
      - If you don't trust me, literally just look at my code and you'll see it's not malicious.
    - Once that's done, reload the spreadsheet.
    - If all worked out good, you should have a new menu that says `Grab Grubings` (if you didn't change the menu name too)
      - [![menu-ex.png](https://i.postimg.cc/8kfD2619/menu-ex.png)](https://postimg.cc/23YPv3L7)
    - Under it should have a button that says `Scrape Email`
    - Click that and it should take a minute to run before adding your data to the spreadsheet. 

Hope this'll help any email scraping endeavours you have!
