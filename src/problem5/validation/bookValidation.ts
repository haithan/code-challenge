import Joi from 'joi';

export const createBookSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title must be less than 255 characters',
            'any.required': 'Title is required'
        }),
    
    author: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Author is required',
            'string.min': 'Author must be at least 1 character long',
            'string.max': 'Author must be less than 255 characters',
            'any.required': 'Author is required'
        }),
    
    description: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 1 character long',
            'string.max': 'Description must be less than 1000 characters',
            'any.required': 'Description is required'
        }),
    
    genre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Genre is required',
            'string.min': 'Genre must be at least 1 character long',
            'string.max': 'Genre must be less than 100 characters',
            'any.required': 'Genre is required'
        }),
    
    status: Joi.string()
        .valid('available', 'borrowed', 'reserved')
        .default('available')
        .messages({
            'any.only': 'Status must be one of: available, borrowed, reserved'
        })
});

export const updateBookSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title must be less than 255 characters'
        }),
    
    author: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Author cannot be empty',
            'string.min': 'Author must be at least 1 character long',
            'string.max': 'Author must be less than 255 characters'
        }),
    
    description: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .messages({
            'string.empty': 'Description cannot be empty',
            'string.min': 'Description must be at least 1 character long',
            'string.max': 'Description must be less than 1000 characters'
        }),
    
    genre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .messages({
            'string.empty': 'Genre cannot be empty',
            'string.min': 'Genre must be at least 1 character long',
            'string.max': 'Genre must be less than 100 characters'
        }),
    
    status: Joi.string()
        .valid('available', 'borrowed', 'reserved')
        .messages({
            'any.only': 'Status must be one of: available, borrowed, reserved'
        })
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

export const bookFiltersSchema = Joi.object({
    genre: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .messages({
            'string.empty': 'Genre filter cannot be empty',
            'string.min': 'Genre filter must be at least 1 character long',
            'string.max': 'Genre filter must be less than 100 characters'
        }),
    
    status: Joi.string()
        .valid('available', 'borrowed', 'reserved')
        .messages({
            'any.only': 'Status filter must be one of: available, borrowed, reserved'
        }),
    
    search: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Search term cannot be empty',
            'string.min': 'Search term must be at least 1 character long',
            'string.max': 'Search term must be less than 255 characters'
        }),
    
    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .messages({
            'number.base': 'Limit must be a number',
            'number.integer': 'Limit must be an integer',
            'number.min': 'Limit must be at least 1',
            'number.max': 'Limit cannot exceed 100'
        }),
    
    page_num: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'Page number must be a number',
            'number.integer': 'Page number must be an integer',
            'number.min': 'Page number must be at least 1'
        })
});

export const validateCreateBook = (data: any) => {
    return createBookSchema.validate(data, { abortEarly: false });
};

export const validateUpdateBook = (data: any) => {
    return updateBookSchema.validate(data, { abortEarly: false });
};

export const validateBookFilters = (data: any) => {
    return bookFiltersSchema.validate(data, { abortEarly: false });
};
