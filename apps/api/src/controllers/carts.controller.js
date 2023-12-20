import { createCartService, deleteCartService, getCartService, updateCartService } from "../services/carts.services";

const sendResponse = (res, statusCode, result, errorMessage) => {
    if (statusCode === 200) {
        return res.status(statusCode).json({
            message: 'success',
            data: result,
        });
    } else if (statusCode === 500) {
        return res.status(statusCode).json({
            message: 'error',
            error: errorMessage,
        });
    } 
};

export const createCartController = async (req, res) => {
    try {
        const { userId, productId, price, quantity } = req.body;
        const result = await createCartService(userId, productId, price, quantity);
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const updateCartController = async (req, res) => {
    try {
        const { cartProductId } = req.params;
        const { quantity } = req.body;
        const result = await updateCartService(cartProductId, quantity);
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const deleteCartController = async (req, res) => {
    try {
        const { cartProductId } = req.params;
        const result = await deleteCartService(cartProductId);
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getCartController = async (req, res) => {
    try {
        const { userId } = req.params
        const result = await getCartService(userId)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}