$(function() {

	// 共用のModel
	var MyModel = Backbone.Model.extend();


    /* パーツのView
	--------------------------------------------------------- */
    var MyView = Backbone.View.extend({
        tagName: 'section',
        stat: 'on',
        events:{
        	'click .stat1':'changeStat_on',
        	'click .stat2':'changeStat_off',
        	'click .stat3':'changeStat_null'
        },

        changeStat_on: function(){
            this.model.set({'stat':'on'});
        },
        changeStat_off: function(){
            this.model.set({'stat':'off'});
        },
        changeStat_null: function(){
            this.model.set({'stat':'null'});
        },
        initialize: function() {
        	this.listenTo(this.model, 'change', this.render);
        	this.model.set({'stat':'on'});
        },

        render: function(topicModel) {
            this.$el.html($("#viewTemplate").render(this.model.toJSON()));
            return this;
        }

    });

	var AppView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click #btn-newView': 'newView'
		},
		initialize: function(){
			
			// ViewとModel生成
			var myModel1 = new MyModel({
				name:'pater'
			});

			var tt = new MyView({model:myModel1});
			this.$('#viewTest').append(tt.render().el);


			var myModel2 = new MyModel({
				name:'mary'
			});

			var yy = new MyView({model:myModel2});

			this.$('#viewTest').append(yy.render().el);


		},
		newView: function(){
			console.log('new view');

			var _model = new MyModel({
				name: $('#appendedInputButton').val()
			});
			var _view = new MyView({model:_model});
			
			this.$('#viewTest').append(_view.render().el);

			$('#appendedInputButton').val('');

		}

	});

	app = new AppView();


});