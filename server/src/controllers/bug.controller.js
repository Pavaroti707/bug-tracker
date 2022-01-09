import dbErrorHandler from "../helpers/dbErrorHandler";
import Bug from "../models/bug.model";
import _ from "lodash";

const bugById = (req, res, next, id) => {
  Bug.findOne({ id: req.params.bugId }, (err, bug) => {
    if (err || !bug) {
      return res.status(400).json({ error: "Bug not found!" });
    }

    req.profile = bug;
    next();
  })
    .populate("assigned")
    .populate("creator");
};

const create = async (req, res, next) => {
  let id;

  await Bug.find((err, bugs) => {
    id = bugs.length + 1;
  });

  const bug = new Bug({
    id: id,
    name: req.body.name,
    details: req.body.details,
    steps: req.body.steps,
    version: req.body.version,
    priority: req.body.priority,
    assigned: req.body.assigned,
    creator: req.body.creator,
  });

  bug.save((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(bug);
  });
};

const list = (req, res) => {
  Bug.find((err, bugs) => {
    if (err) {
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err),
      });
    }
    res.json(bugs);
  })
    .select("_id id name details steps version priority assigned creator time completed")
    .populate("assigned")
    .populate("creator");
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const remove = (req, res, next) => {
  let bug = req.profile;

  bug.remove((err, deletedBug) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(deletedBug);
  });
};

const update = (req, res, next) => {
  let bug = req.profile;
  let data = req.body;

  bug.assigned = bug.assigned._id;
  bug.creator = bug.creator._id;

  bug = _.extend(bug, data);

  bug.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(bug);
  });
};

export default { create, list, bugById, read, remove, update };
