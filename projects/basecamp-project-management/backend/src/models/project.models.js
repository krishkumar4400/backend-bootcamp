import mongoose, { model, Schema } from 'mongoose';

const projectSchema = new Schema ({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const projectModel = model.Project || new model("Project", projectSchema);

export default projectModel;