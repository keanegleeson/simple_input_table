const express = require('express');
const router = express.Router();
const Project = require('../models').Project;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}


/* GET all projects */
router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
  res.render("projects/index", { projects, title: "Renewable Energy Tracking" });
}));

/* Create a new project row. */
router.get('/new', (req, res) => {
  res.render("projects/index", { project: {}, title: "New Project" });
});

/* POST create project. */
router.post('/', asyncHandler(async (req, res) => {
  let project;
  try {
    project = await Project.create(req.body);
    res.redirect("/projects/" + project.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      project = await Project.build(req.body);
      res.render("/", { project, errors: error.errors, title: "New Project" })
    } else {
      throw error;
    }  
  }
}));

/* Edit project form. */
router.get("/:id/edit", asyncHandler(async(req, res) => {
  const project = await Project.findByPk(req.params.id);
  if(project) {
    res.render("projects/edit", { project, title: "Edit Project" });      
  } else {
    res.sendStatus(404);
  }
}));

/* GET individual project. */
router.get("/:id", asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if(project) {
    res.render("projects/index", { project, title: project.title });  
  } else {
    res.sendStatus(404);
  }
})); 

/* Update a project. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  let project;
  try {
    project = await Project.findByPk(req.params.id);
    if(project) {
      await project.update(req.body);
      res.redirect("/projects/" + project.id); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      project = await Project.build(req.body);
      project.id = req.params.id;
      res.render("projects/edit", { project, errors: error.errors, title: "Edit Project" })
    } else {
      throw error;
    }
  }
}));

/* Delete project form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if(project) {
    res.render("projects/delete", { project, title: "Delete Project" });
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual project. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const project = await Project.findByPk(req.params.id);
  if(project) {
    await project.destroy();
    res.redirect("/projects");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;

/* GET project */
router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
  res.render("projects/index", { projects, title: "Renewable Energy Tracking" });
}));

module.exports = router;
