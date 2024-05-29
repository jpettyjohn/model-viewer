// class RoomBrowser extends Autodesk.Viewing.ToolInterface {
// 	constructor() {
// 		super();
// 		this.name = ["room-browser-tool"];

// 		// Hack: delete functions defined *on the instance* of the tool.
// 		// We want the tool controller to call our class methods instead.
// 		delete this.register;
// 		delete this.deregister;
// 		delete this.activate;
// 		delete this.deactivate;
// 		delete this.getPriority;
// 		delete this.handleMouseMove;
// 		delete this.handleButtonDown;
// 		delete this.handleButtonUp;
// 		delete this.handleSingleClick;
// 	}

// 	register() {
// 		console.log("RoomBrowser registered.");
// 	}

// 	deregister() {
// 		console.log("RoomBrowser unregistered.");
// 	}

// 	activate(name, viewer) {
// 		this.viewer = viewer;
// 		name = this.name;
// 		console.log("RoomBrowser", name, "activated.");
// 		return true;
// 	}

// 	deactivate(name) {
// 		this.viewer = null;
// 		console.log("RoomBrowser", name, "deactivated.");
// 	}

// 	getPriority() {
// 		return 42; // Or feel free to use any number higher than 0 (which is the priority of all the default viewer tools)
// 	}

// 	update(highResTimestamp) {
// 		return false;
// 	}

// 	handleMouseMove(event) {
// 		return false;
// 	}

// 	handleButtonDown(event, button) {
// 		return false;
// 	}

// 	handleButtonUp(event, button) {
// 		return false;
// 	}

// 	handleSingleClick(event, button) {
// 		return false;
// 	}

// 	_update() {
// 		// Here we will be updating the actual geometry
// 	}
// }

// const RoomBrowserName = "room-browser-tool";

// class RoomBrowserExtension extends Autodesk.Viewing.Extension {
// 	constructor(viewer, options) {
// 		super(viewer, options);
// 		this.tool = new RoomBrowser();
// 	}

// 	load() {
// 		this.viewer.toolController.registerTool(this.tool);
// 		console.log("RoomBrowserExtension loaded.");
// 		return true;
// 	}

// 	unload() {
// 		this.viewer.toolController.deregisterTool(this.tool);
// 		console.log("RoomBrowserExtension unloaded.");
// 		return true;
// 	}

// 	onToolbarCreated(toolbar) {
// 		const controller = this.viewer.toolController;
// 		const registeredTools = controller.getToolNames();
// 		console.log(registeredTools);
// 		this.button1 = new Autodesk.Viewing.UI.Button("room-browser-tool-button");
// 		this.button1.onClick = (ev) => {
// 			if (controller.isToolActivated(RoomBrowserName)) {
// 				console.log("in");
// 				controller.deactivateTool(RoomBrowserName);
// 				this.button1.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
// 			} else {
// 				console.log("out");
// 				controller.activateTool(RoomBrowserName);
// 				this.button1.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
// 			}
// 		};
// 		this.button1.setToolTip("Room Browser");
// 		this.group = new Autodesk.Viewing.UI.ControlGroup("room-browser-group");
// 		this.group.addControl(this.button1);
// 		toolbar.addControl(this.group);
// 	}
// }

// Autodesk.Viewing.theExtensionManager.registerExtension(
// 	"RoomBrowserExtension",
// 	RoomBrowserExtension
// );

// export default RoomBrowserExtension;
