import Contact from "../models/contact.js";
import {HttpError} from "../helpers/index.js";
import {ctrlWrapper} from "../decorators/index.js";


const getAll = async (req, res,) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription");
    res.json(result)
};

const getById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
        if(!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
        }
    res.json(result)
};

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
    }
    res.json(result);
}

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json({
        message: "Contact delete"
    })
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById),
}