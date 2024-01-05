import * as http from "http";
import { newSequelize } from "./config";
import { model } from "./model";
import { Products } from "./model/product";
import { Catigory } from "./model/catigory";
import {
  OrdersP,
  PutA,
  PutO,
  PutC,
  PutP,
  catigoryP,
  postA,
  postP,
  PutOC,
} from "./controller";
import { Auth } from "./model/auth";
import { Orders } from "./model/orders";
import { Orders_catigory } from "./model/orders_ctigory";
import express from 'express'
import cors from 'cors'
model();

const server = http.createServer(async (req:any,res:any) => {
  const app = express()
  app.use(cors())
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');


    if (req.method === "GET" && req.url === "/") {
      res.end(
        JSON.stringify(
          await Catigory.findAll({
            include: Products,
          })
        )
      );
    } else if (req.method === "POST" && req.url === "/products") {
      postP(req, res);
    } else if (req.method === "GET" && req.url === "/products") {
      try {
        const products = await Products.findAll({
          include: Auth,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server xatosi" }));
      }
    } else if (req.method === "GET" && req.url === "/productsa") {
      try {
        const products = await Products.findAll({
          include: Catigory,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server xatosi" }));
      }
    } else if (req.method === "PUT" && req.url === "/products") {
      if (req.method === "PUT" && req.url === "/products") {
        PutP(req, res);
      }
    } else if (
      req.method === "POST" &&
      req.url &&
      req.url.startsWith("/products/")
    ) {
      const productId = parseInt(req.url.slice(10), 10);
      try {
        const product = await Products.findByPk(productId);
        if (product) {
          await product.destroy();
          console.log("Product deleted successfully.");
          res.end(await Products.findAll());
        } else {
          res.end("poruct not fount");
          console.log("Product not found.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    } else if (req.method === "POST" && req.url === "/catigory") {
      catigoryP(req, res);
    } else if (req.method === "GET" && req.url === "/catigory") {
      res.end(JSON.stringify(await Catigory.findAll({ include: Products })));
    } else if (req.method === "POST" && req.url === "/catigorya") {
      PutC(req, res);
    } else if (
      req.method === "POST" &&
      req.url &&
      req.url.startsWith("/catigory/")
    ) {
      const categoryId = parseInt(req.url.slice(10), 10);
      try {
        const deletedCategory = await Catigory.findByPk(categoryId);
        if (deletedCategory) {
          await deletedCategory.destroy();
          console.log("Category deleted successfully.");
          res.end(JSON.stringify({ success: true }));
        } else {
          console.log("Category not found.");
          res.end(
            JSON.stringify({ success: false, error: "Category not found." })
          );
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        res
          .status(500)
          .json({ success: false, error: "Internal server error." });
      }
    } else if (req.method === "GET" && req.url === "/users") {
      try {
        const products = await Auth.findAll({ include: Products });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server xatosi" }));
      }
    } else if (req.method === "POST" && req.url === "/users") {
      postA(req, res);
    } else if (req.method === "POST" && req.url === "/usersa") {
      PutA(req, res);
    } else if (
      req.method === "POST" &&
      req.url &&
      req.url.startsWith("/users/")
    ) {
      const userId = req.url.split("/")[2];

      Auth.findByPk(userId)
        .then((user) => {
          if (user) {
            user
              .destroy()
              .then(() => {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(
                  JSON.stringify({ message: "User deleted successfully." })
                );
              })
              .catch((error: Error) => {
                console.error("Error deleting user:", error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: "Internal server error." }));
              });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User not found." }));
          }
        })
        .catch((error: Error) => {
          console.error("Error retrieving user:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: "Internal server error." }));
        });
    } else if (
      req.method === "GET" &&
      req.url &&
      req.url.startsWith("/users/")
    ) {
      const userId = req.url.split("/")[2];

      res.end(
        JSON.stringify(await Auth.findOne({ where: { username: userId } }))
      );
    } else if (req.method === "POST" && req.url === "/orders") {
      OrdersP(req, res);
    } else if (req.method === "GET" && req.url === "/orders") {
      res.end(JSON.stringify(await Orders.findAll()));
    } else if (req.method === "PUT" && req.url === "/orders") {
      PutO(req, res);
    } else if (
      req.method === "POST" &&
      req.url &&
      req.url.startsWith("/orders/")
    ) {
      const userId = req.url.split("/")[2];

      Orders.findByPk(userId)
        .then((user) => {
          if (user) {
            user
              .destroy()
              .then(() => {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(
                  JSON.stringify({ message: "Orders deleted successfully." })
                );
              })
              .catch((error: Error) => {
                console.error("Error deleting Orders:", error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: "Internal server error." }));
              });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Orders not found." }));
          }
        })
        .catch((error: Error) => {
          console.error("Error retrieving user:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: "Internal server error." }));
        });
    } else if (req.method === "GET" && req.url === "/ordersCatygory") {
      res.end(JSON.stringify(await Orders_catigory.findAll()));
    } else if (req.method === "POST" && req.url === "/ordersCatygory") {
      let data = "";

      req.on("data", (chunk: any) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          // data o'zida req.body bo'ladi
          const body = JSON.parse(data);

          // Endi body o'zida kerakli ma'lumotlarni ishlatishingiz mumkin
          if (!body.catigory_id || !body.product_id) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ success: false, err: "Malumotlar to'liq emas" })
            );
            return;
          }

          Orders_catigory.create(body);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          console.error(error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Noto'g'ri JSON formati" }));
        }
      });
    } else if (
      req.method === "DELETE" &&
      req.url &&
      req.url.startsWith("/ordersCatygory/")
    ) {
      const categoryId = req.params.id;

      try {
        const deletedCategory = await Catigory.destroy({
          where: { id: categoryId },
        });

        if (deletedCategory) {
          res
            .status(200)
            .json({ success: true, message: "Category deleted successfully." });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Category not found." });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        res
          .status(500)
          .json({ success: false, error: "Internal server error." });
      }
    } else if (req.method === "PUT" && req.url === "/ordersCatygory") {
      PutOC(req, res);
    }
  });
async  function main() {
    await newSequelize.authenticate();
    console.log("Connection has been established successfully.");
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
  main()
