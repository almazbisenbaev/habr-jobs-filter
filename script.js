// Toggle functionality
const shouldHideCrowdedJobs = true;

const bidsToHighlightLimit = 3; // Jobs with <5 bids will be highlighted
const bidsToHideLimit = 5; // Jobs with >5 bids will be hidden



// Helper fucntion, helps to extract an substring integer from a string
function extractNumFromString(string) { 
    var str = string; 
    var matches = str.match(/(\d+)/);
    if (matches) { 
        return matches[0];
    }
    return 0; // return zero if no integer found in the string
}


// Helper fucntion, get a closest parent with a class
var getClosestParent = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};






// Hide jobs with too many bids
const hideCrowded = function(){

    let allBidsWrappers = document.querySelectorAll('.params__responses');

    allBidsWrappers.forEach(function(item){

        var bidsElement = item.querySelector('.params__count');

        if(bidsElement){

            var mainParent = getClosestParent(item, '.content-list__item');

            let textValue = bidsElement.textContent;
            let bidsNumber = extractNumFromString(textValue);
    
            if(bidsNumber >= bidsToHideLimit){
                mainParent.style.opacity = '0.2';
            }

        }
        
    });

};





// Start the script when page loads
window.onload = function() {


    console.log('Habr extension is working');
    console.log('Author: bisenbaev.com');


    // Hides all crowded jobs on page load
    setTimeout(function(){
        if(shouldHideCrowdedJobs){
            hideCrowded();
        }
    }, 1000);


}
