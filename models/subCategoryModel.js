import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
	name: { type: String, required: true },
	category_id: { type: String, required: true }
  }
);
const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

export default SubCategoryModel;
