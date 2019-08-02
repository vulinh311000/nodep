import {addNew, removeRequestContact} from "../services/contactService";

export const postAddNew = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const contactId = req.body.uid;

        const newContact = await addNew(currentUserId, contactId);
        return res.status(200).send({
            success: !!newContact,

        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const deleteRequestContact = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const contactId = req.body.uid;

        const removeReq = await removeRequestContact(currentUserId, contactId);
        return res.status(200).send({
            success:!!removeReq
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
