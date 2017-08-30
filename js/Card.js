//Card class
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createCard();

	function createCard() {
		//creating elements of a column
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		//adding event
		$cardDelete.click(function() {
			var self = this;
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'DELETE',
				success: function(response) {
					self.$element.remove();
				}
			});
		});

		//card construction
		$card.append($cardDelete).append($cardDescription);

		//returning created card
		return $card;
	}
}

//adding function (removing card) to card prototype
Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};