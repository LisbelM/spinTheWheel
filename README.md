<b>Completed Tasks:</b>
<ul>
	<li>Insert by User</li>
	<li>Insert by Admin in Admin Landing page</li>
	<li>Update of odds by Admin</li>
	<li>Reflection of odds in angles of Spinner Wheel</li>
	<li>Identification of winning submission & popup </li>
		pop-up closes
	<li>Admin ability to select & diselect submissions</li>
		reflected on Spinner Wheel
	<li>Admin ability to delete submissions</li>
</ul>

<b>Missing:</b>
<ul>
	<li>Design details scattered throughout</li>
	<li>Error page on user side</li>
	<li>Delete popup for Admin</li>
	<li>Spin history for Admin</li>
	<li>Confetti overlay for winner popup</li>
	<li>Hover effect for selected submission on Admin page </li>
</ul>

<b>Bugs (identified) & Next Steps:</b>
<ul>
	<li>Rendering of popup causes a Spinner Wheel to rerender as well losing arrows place and looking glitchy</li>
		<li>Fix : render popup seperately</li>

	<li>Attempted Face on Middle of Spinner but due to constant redrawing of canvas to achieve spinning face constantly</li>
	<li>flashes</li>
		<li>Fix: create a seperate canvas object apart from wheel that will hold the chosen admin image</li>

	<li>Data structure used for holding data incoming from Firestore does not delete old objects once admin has deleted</li>
	causes respins of wheel to have more submissions than on list
		<li>Fix: change data structure to have a entries be identified by doc.id & delete appropriately in same function </li>
		that document is removed from collection in Firestore

	<li>(not a bug) make existing popup for winner to be a component with props to be passed and use this component</li>
	to create all other popups required
</ul>
