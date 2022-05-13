<b>Completed Tasks:</b>

Insert by User
Insert by Admin in Admin Landing page
Update of odds by Admin
Reflection of odds in angles of Spinner Wheel
Identification of winning submission & popup 
	pop-up closes
Admin ability to select & diselect submissions
	reflected on Spinner Wheel
Admin ability to delete submissions

Missing:

Design details scattered throughout
Error page on user side
Delete popup for Admin
Spin history for Admin
Confetti overlay for winner popup
Hover effect for selected submission on Admin page

Bugs (identified) & Next Steps:

Rendering of popup causes a Spinner Wheel to rerender as well losing arrows place and looking glitchy
	Fix : render popup seperately

Attempted Face on Middle of Spinner but due to constant redrawing of canvas to achieve spinning face constantly
flashes
	Fix: create a seperate canvas object apart from wheel that will hold the chosen admin image

Data structure used for holding data incoming from Firestore does not delete old objects once admin has deleted
causes respins of wheel to have more submissions than on list
	Fix: change data structure to have a entries be identified by doc.id & delete appropriately in same function 
	that document is removed from collection in Firestore

(not a bug) make existing popup for winner to be a component with props to be passed and use this component
to create all other popups required
