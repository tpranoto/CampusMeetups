import * as Mongoose from "mongoose";
import { ICategoryModel } from "../interface/ICategoryModel";
import * as crypto from "crypto";

class CategoryModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                categoryId: String,
                name: String,
            },
            { collection: "Category" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ICategoryModel>("Category", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    public async createCategory(response: any, categoryObj: any) {
        const id = crypto.randomBytes(16).toString("hex");
        categoryObj.categoryId = id;

        try {
            await this.model.create([categoryObj]);
            response.json(categoryObj);
        } catch (e) {
            console.error(e);
            var msg = `failed to create category ${JSON.stringify(categoryObj)}`;
            response.status(500).json({ error: msg });
        }
    }

    public async retrieveCategory(response: any, categoryId: string) {
        var query = this.model.findOne({ categoryId: categoryId });
        query.select("-_id -__v"); // filter out _id & __v fields
        try {
            const result = await query.exec();
            response.json(result);
        } catch (e) { 
            console.error(e);
            var msg = `failed to retrieve category ${categoryId}`;
            response.status(500).json({ error: msg });
        }
    }

    public async retrieveAllCategories(response: any) {
        var query = this.model.find({});
        query.select("-_id -__v"); // filter out _id & __v fields
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        } catch (e) {
            console.error(e);
            var msg = `failed to retrieve categories`;
            response.status(500).json({ error: msg });
        }
    }

    public async deleteCategory(response: any, categoryId: string) {
        var query = this.model.deleteOne({ categoryId: categoryId });
        try {
            await query.exec();
            response.json({ message: "OK" });
        } catch (e) {
            console.error(e);
            var msg = `failed to delete category ${categoryId}`;
            response.status(500).json({ error: msg });
        }
    }
}

export { CategoryModel };
