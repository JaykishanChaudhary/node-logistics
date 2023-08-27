const ItemModel=require('../model/ItemSchema')

exports.CreateItem = (async(req,res) => {
    try{
        const {name,price} = req.body;
        const NewItem = await ItemModel.create({
            name,
            price
        })
        console.log('New item created:', NewItem);
        res.status(200).json({
            status:'success',
            result:NewItem
        })
    }catch (err){
        console.error('Error creating item:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating the item',
            error: err.message
        })
    }
})

exports.GetItems = (async(req, res) => {
    try{
        const Items = await ItemModel.find({});
        if(Items.length > 0){
            res.status(200).json({
                status:"success",
                result:Items
            })
        }else {
            res.status(404).json({
                status:'failure',
                result:"no items found"
            })
        }
    }catch (err){
        console.error('Error fetching items:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching items',
            error: err.message
        })
    }
})


exports.UpdateItem = (async (req,res) => {
    try{
        const _id = req.params;
        console.log(_id);
        const Item = await ItemModel.findOne({_id});
        console.log(Item);
        if(Item){
            const UpdatedItem = await ItemModel.updateOne(Item,req.body);
            console.log(UpdatedItem);
            res.status(200).json({
                status:'success',
                result:UpdatedItem
            })
        }else {
            res.status(404).json({
                status:"failure",
                result:"No item found of this id"
            })
        }
    }catch (err){
        console.error('Error updating item:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating the item',
            error: err.message
        });
    }
})