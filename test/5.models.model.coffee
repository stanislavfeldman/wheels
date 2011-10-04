vows = require "vows"
assert = require "assert"
core = require "../lib/core"
controllers = require "../lib/controllers"
models = require "../lib/models"

class Model1
	constructor: (@i, @s) ->

test = vows.describe "models.Model"
test.addBatch
	"":
		topic: ->				
			app = new core.Application()
			options =
				classes: [Model1]
				user: "root"
				password: "!1ebet2@"
				database: "kiss_project"
			require("mootools.js").apply(GLOBAL);
			app.options.models = Object.merge app.options.models, options
			new models.Manager(app.options.models)
			return new Model1(5, "lala")
		"when we try to get model functions save, remove, find":
			"we get them and they are functions": (topic) ->
				assert.isFunction topic.save
				assert.isFunction Model1.find
				assert.isFunction topic.remove
		"when we try to save model":
			"we get model object with id property": (topic) ->
				topic.save (err, data) ->
					assert.isNumber data.id
		"when we find existing object":
			"we get this object and id is number": (topic) ->
				Model1.find { id: 1 }, (err, data) ->
					assert.isNumber data.id

test.export module

