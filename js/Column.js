//Column class
function Column(id, name) {
	var self = this; //useful for nested functions

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createColumn();

	function createColumn() {
		//creating elements of a column
		var $column = $('<div>').addClass('column col-md-3');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		//adding two events
		$columnDelete.click(function() {
			self.removeColumn();
		});
			//Add a note after clicking on the button:
		$columnAddCard.click(function(card) {
			var cardName = prompt('Enter the name of the card');
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					//body query
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					//create a new client side card
					var card = new Card(response.id, cardName);
					self.addCard(card);
				}
			});
		});
		$columnTitle.click(function() {
			self.renameColumn();
		})

		//column construction
		$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);

		//returning created column
		return $column;
	}
}


//adding functions to column prototype
Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.$element.remove();
			}
		});
	},
	renameColumn: function() {
		var self = this;
		var newName = '_' + prompt('Rename your column') + '_';
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: newName
			}
		})
	}
};