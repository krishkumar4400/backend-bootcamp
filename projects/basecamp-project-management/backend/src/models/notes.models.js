import mongoose, { model, Schema } from "mongoose";

const projectNoteSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true});

const projectNoteModel = model.ProjectNote || model("ProjectNote", projectNoteSchema);
export default projectNoteModel;