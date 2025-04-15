import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const validationFormProduct = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(500, "Price must be at least 500"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  preparationTime: Yup.number()
    .required("Preparation time is required")
    .min(1, "Must be at least 1 minute"),
  image: Yup.string()
    .required("Image is required")
    .test("is-valid-image", "Please upload a valid image", (value) => {
      if (!value) return false;
      return value.startsWith("data:image/");
    }),
  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  baseIngredients: Yup.array()
    .of(Yup.string().required("Base ingredient cannot be empty"))
    .min(1, "At least one base ingredient is required"),
  extraIngredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Extra ingredient name is required"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be at least 0"),
      })
    )
    .default([]), // Makes it optional
});
