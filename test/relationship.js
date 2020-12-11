const assert = require("assert-one");

const Relationship = require("../src/relationship.js");

describe ("Relationship tests", () => {

	describe ("Constructor", () => {
	
		it ("Creates valid relationship object with minimal template", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toMinimalTemplate(), {
				source: "sourceModel", target: "targetModel", type: "ONE_TO_ONE"
			});
		});

		it ("Creates valid relationship object with minimal template, relationship id", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: Relationship.ONE_TO_ONE
			});
			assert.fieldValues(rel.toMinimalTemplate(), {
				source: "sourceModel", target: "targetModel", type: "ONE_TO_ONE"
			});
		});

		it ("Creates valid relationship object with complete template", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				sourceAs: "source",
				targetAs: "target",
				type: "ONE_TO_ONE",
				name: "relName",
				chain: true
			});
			assert.fieldValues(rel.toCompleteTemplate(), {
				source: "sourceModel", target: "targetModel", sourceAs: "source", targetAs: "target",
				type: "ONE_TO_ONE", name: "relName", chain: true
			});
		});
	
	});

	describe ("Template output", () => {

		it ("Produces minimal template with all defined fields", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				sourceAs: "source",
				type: "ONE_TO_ONE",
				chain: true
			});
			assert.fieldValues(rel.toMinimalTemplate(), {
				source: "sourceModel", target: "targetModel", sourceAs: "source",
				type: "ONE_TO_ONE", chain: true
			});
		});

		it ("Produces minimal template with all possible fields", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				sourceAs: "source",
				targetAs: "target",
				type: "ONE_TO_ONE",
				name: "relName",
				chain: true
			});
			assert.fieldValues(rel.toMinimalTemplate(), {
				source: "sourceModel", target: "targetModel", sourceAs: "source", targetAs: "target",
				type: "ONE_TO_ONE", name: "relName", chain: true
			});
		});

		it ("Produces complete template from minimal input", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toCompleteTemplate(), {
				source: "sourceModel", target: "targetModel", sourceAs: "sourceModel", targetAs: "targetModel",
				type: "ONE_TO_ONE", chain: false
			});
		});

		it ("Produces minimal template with Relationship id", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toMinimalTemplate("internal"), {
				source: "sourceModel", target: "targetModel", type: Relationship.ONE_TO_ONE
			});
		});

		it ("Produces complete template with Relationship id", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toCompleteTemplate("internal"), {
				source: "sourceModel", target: "targetModel", sourceAs: "sourceModel", targetAs: "targetModel",
				type: Relationship.ONE_TO_ONE, chain: false
			});
		});

		it ("Produces minimal template with Relationship object string", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toMinimalTemplate("object"), {
				source: "sourceModel", target: "targetModel", type: "Relationship.ONE_TO_ONE"
			});
		});

		it ("Produces complete template with Relationship object string", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.fieldValues(rel.toCompleteTemplate("object"), {
				source: "sourceModel", target: "targetModel", sourceAs: "sourceModel", targetAs: "targetModel",
				type: "Relationship.ONE_TO_ONE", chain: false
			});
		});

	});

	describe ("Template string output", () => {
	
		it ("Produces template string output with minimum input and default options", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			let ret = rel.toTemplateString();
			assert.equal(ret, [
				'{',
				'    source: "sourceModel",',
				'    target: "targetModel",',
				'    type: "ONE_TO_ONE"',
				'}'].join("\n"));
		});

		it ("Produces template string output with minimum input and internal relationship type format", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			let ret = rel.toTemplateString({ format: "internal" });
			assert.equal(ret, [
				'{',
				'    source: "sourceModel",',
				'    target: "targetModel",',
				'    type: 0',
				'}'].join("\n"));
		});

		it ("Produces template string output with minimum input and object relationship type format", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			let ret = rel.toTemplateString({ format: "object" });
			assert.equal(ret, [
				'{',
				'    source: "sourceModel",',
				'    target: "targetModel",',
				'    type: Relationship.ONE_TO_ONE',
				'}'].join("\n"));
		});

		it ("Produces template string output with minimum input and complete output", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			let ret = rel.toTemplateString({ complete: true });
			assert.equal(ret, [
				'{',
				'    source: "sourceModel",',
				'    target: "targetModel",',
				'    sourceAs: "sourceModel",',
				'    targetAs: "targetModel",',
				'    type: "ONE_TO_ONE",',
				'    chain: false',
				'}'].join("\n"));
		});

		it ("Produces template string output with full input and complete output", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				sourceAs: "source",
				targetAs: "target",
				type: "ONE_TO_ONE",
				name: "relName",
				chain: true
			});
			let ret = rel.toTemplateString({ complete: true });
			assert.equal(ret, [
				'{',
				'    source: "sourceModel",',
				'    target: "targetModel",',
				'    sourceAs: "source",',
				'    targetAs: "target",',
				'    type: "ONE_TO_ONE",',
				'    name: "relName",',
				'    chain: true',
				'}'].join("\n"));
		});

	});

	describe ("Forward and reverse relationship", () => {
			
		it ("Creates forward objects with reverse instances", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_ONE"
			});
			assert.equal(rel.isForward(), true);
			assert.equal(rel.isReverse(), false);
			assert.equal(rel.getTypeString(), "ONE_TO_ONE");
			rel = rel.getReverseRelationship();
			assert.equal(rel.isForward(), false);
			assert.equal(rel.isReverse(), true);
			assert.equal(rel.getSourceName(), "targetModel");
			assert.equal(rel.getTargetName(), "sourceModel");
			assert.equal(rel.getTypeString(), "ONE_TO_ONE");
		});

		it ("Creates forward objects with reverse instances, ONE_TO_MANY", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				type: "ONE_TO_MANY"
			});
			assert.equal(rel.isForward(), true);
			assert.equal(rel.isReverse(), false);
			assert.equal(rel.getTypeString(), "ONE_TO_MANY");
			rel = rel.getReverseRelationship();
			assert.equal(rel.isForward(), false);
			assert.equal(rel.isReverse(), true);
			assert.equal(rel.getSourceName(), "targetModel");
			assert.equal(rel.getTargetName(), "sourceModel");
			assert.equal(rel.getTypeString(), "MANY_TO_ONE");
		});

		it ("Creates forward objects with reverse instances, complete template", () => {
			let rel = new Relationship({
				source: "sourceModel",
				target: "targetModel",
				sourceAs: "source",
				targetAs: "target",
				type: "ONE_TO_MANY",
				name: "relName",
				chain: true
			});
			assert.equal(rel.isForward(), true);
			assert.equal(rel.isReverse(), false);
			assert.equal(rel.getTypeString(), "ONE_TO_MANY");
			rel = rel.getReverseRelationship();
			assert.equal(rel.isForward(), false);
			assert.equal(rel.isReverse(), true);
			assert.equal(rel.getSourceName(), "targetModel");
			assert.equal(rel.getTargetName(), "sourceModel");
			assert.equal(rel.getSourceAlias(), "target");
			assert.equal(rel.getTargetAlias(), "source");
			assert.equal(rel.getTypeString(), "MANY_TO_ONE");
			assert.equal(rel.getName(), "relName");
			assert.equal(rel.isChained(), true);
		});

	});

});
