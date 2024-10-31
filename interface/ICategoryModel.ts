import mongoose from "mongoose";

interface ICategoryModel extends mongoose.Document {
    categoryId: string;
    name: string;
}
export { ICategoryModel };
