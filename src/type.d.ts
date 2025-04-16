import { ReactNode, RefObject } from "react";
export interface LoginFormikValues {
  email: string;
  password: string;
}

export interface Res {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export interface Login extends Res {
  user?: User;
  token?: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface DashboardLayoutProps extends ChildrenProps {
  selected:
    | "Dashboard"
    | "Orders"
    | "Products"
    | "Workers"
    | "Users"
    | "Admin"
    | "Settings";
}

import { Dispatch, SetStateAction } from "react";
export interface Res {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}
export interface Register extends Res {
  name?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterFormik {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Login extends Res {
  user?: User;
  token?: string;
}

export interface User extends Res {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface LoginFormik {
  email: string;
  password: string;
}

export interface CardScreenComponentProps {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
  calories: number;
  ingredientsBase: string[];
  ingredientsExtra: ingredientsExtra[];
  ingredients: string[];
  orderDate: Date | null;
}

export interface Product extends Res {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  ingredients: string[];
  baseIngredients: string[];
  extraIngredients: extraIngredients[];
  preparationTime: number;
  calories: number;
  createdBy: CreatedBy;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface CreatedBy {
  name: string;
  email: string;
  role: string;
  id: string;
}

export type useDataFetchResponse<T> = [T, boolean, string | null];

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Paginate {
  meta: Meta;
}

export interface PaginateProduct extends Paginate {
  data: Product[];
}

export interface ingredientsExtra {
  name: string;
  price: number;
  _id: string;
}

export interface ModalCardComponentProps {
  id: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  image: string;
  title: string;
  price: number;
  category: string;
  calories: number;
  description: string;
  ingredientsBase: string[];
  ingredientsExtra: ingredientsExtra[];
  ingredients: string[];
}

export interface Card extends Res {
  user: string;
  items: Item[];
  total: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  remainingTime?: number;
  orderDate: Date;
  code: string;
  retired: boolean;
}

export interface Item {
  product: Product;
  quantity: number;
  extra: number;
  ingredients: string[];
  extraIngredients?: string[];
  price: number;
  _id: string;
}

export interface CartItem {
  user: string;
  items: Item[];
  total: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface RenderItemProps {
  item: Item;
  cartId: string;
  disable: boolean;
  setDisable: Dispatch<SetStateAction<boolean>>;
}

export interface Payment extends Res {
  init_point: string;
}

export interface JSONWebTokenRevalidate extends Res {
  token: string;
  user: User;
}

export interface CardTimerProps {
  cart: Card;
  index: number;
}

export interface ItemTimerProps {
  item: Item;
}

export interface CountdownTimerProps {
  orderDate: Date;
  currentDate: string;
  preparationMinutes: number;
}

export interface Timer {
  hours: string;
  minutes: string;
  seconds: string;
  isFinished: boolean;
}

export interface OrdersDashboardProps {
  orders: Card[];
}

export interface CardDashboardProps {
  product: Product;
}

export interface ModalDashboardProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ModalNewProductDashboardProps extends ModalDashboardProps {
  product?: Product | null;
}

export interface ModalDetailsProductDashboardComponentProps
  extends ModalDashboardProps {
  product: Product;
}

export interface extraIngredients {
  name: string;
  price: number;
}

export interface initialValueProductForm {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  calories: number;
  preparationTime: number;
  image: string;
  ingredients: string[];
  baseIngredients: string[];
  extraIngredients: extraIngredients[];
}

export interface CloudinaryUpload {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}

export interface MetaProduct {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductOpenIA {
  name: string;
  description: string;
  category: string;
  calories: number;
  preparation_time: number;
  ingredients: string[];
  base_ingredients: string[];
  extra_ingredients: extraIngredients[];
  product_price: number;
}

export interface ModalLayoutComponentProps extends ChildrenProps {
  modalRef: RefObject<HTMLDivElement | null>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface initialValuesFormRegisterWorker {
  firstName: string;
  firstLastName: string;
  secondLastName: string;
}
