import { Auth } from "../model/auth";
import { Catigory } from "../model/catigory";
import { Orders } from "../model/orders";
import { Orders_catigory } from "../model/orders_ctigory";
import { Products } from "../model/product";

export const postP = (req: any, res: any) => {
  let data = "";

  req.on("data", (chunk: any) => {
    data += chunk;
  });

  req.on("end", async () => {
    try {
      // data o'zida req.body bo'ladi
      const body = JSON.parse(data);

      // Endi body o'zida kerakli ma'lumotlarni ishlatishingiz mumkin
      if (!body.price || !body.ramka || !body.tavsiya) {
        return res.end(
          JSON.stringify({ success: false, err: `malumotlar to'liq emas` })
        );
      }
      Products.create(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(await Products.findOne({ where: { price: body.price } }))
      );
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Noto'g'ri JSON formati" }));
    }
  });
};
export const catigoryP = (req: any, res: any) => {
  let data = "";

  req.on("data", (chunk: any) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      // data o'zida req.body bo'ladi
      const body = JSON.parse(data);

      // Endi body o'zida kerakli ma'lumotlarni ishlatishingiz mumkin
      if (!body.title) {
        return res.end(
          JSON.stringify({ success: false, err: `malumotlar to'liq` })
        );
      }

      Catigory.create(body);
      res.end(JSON.stringify({ success: true }));
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Noto'g'ri JSON formati" }));
    }
  });
};
export const postA =  (req: any, res: any) => {
  let data = "";

  req.on("data", (chunk: string) => {
    data += chunk;
  });

  req.on("end",async () => {
          
    try {
      // data o'zida req.body bo'ladi
      const body = JSON.parse(data);

      const data2 = await Auth.findOne({
        where: { username: body.username },
      });      
      // Endi body o'zida kerakli ma'lumotlarni ishlatishingiz mumkin
      if (!body.username  || !body.phone_number) {
        res.end(
          JSON.stringify({ success: false, err: "malumotlar to'liq emas" })
        );
        
        return;
      }else if (data2) {
      res.end(
        JSON.stringify({ success: false, err: "Bu Username allaqachon band qilingan" })
      );
      }
      
      
      await Auth.create(body);
      const data1 =await  Auth.findOne({ where: { username: body.username } })      
      res.end(JSON.stringify(data1));
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Noto'g'ri JSON formati" }));
    }
  });
};
export const OrdersP = async (req: any, res: any) => {
  let data = "";

  req.on("data", (chunk: string) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const body = JSON.parse(data);


      if (!body.auth_id || !body.product_id) {
        res.end(
          JSON.stringify({ success: false, err: "malumotlar to'liq emas" })
        );
        return;
      }
      Orders.create(body);
      res.end(JSON.stringify({ success: true }));
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Noto'g'ri JSON formati" }));
    }
  });
};
export const PutP = async (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk;
  });

  req.on("end", async () => {
    const updatedProduct: any = JSON.parse(body);
    const productId = updatedProduct.id;

    const product: any = await Products.findOne({
      where: { id: productId },
    });

    if (product) {
      updatedProduct?.price ? (product.price = updatedProduct?.price) : null;
      updatedProduct?.chegPrice
        ? (product.chegPrice = updatedProduct?.chegPrice)
        : null;
      updatedProduct?.ramka ? (product.ramka = updatedProduct?.ramka) : null;
      updatedProduct.tavsiya
        ? (product.tavsiya = updatedProduct.tavsiya)
        : null;
      await product.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await Products.findAll()));
      console.log(product);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Mahsulot topilmadi" }));
    }
  });
};
export const PutA = async (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk;
  });

  req.on("end", async () => {
    const updatedProduct: any = JSON.parse(body);
    const productId = updatedProduct.username;

    const product: any = await Auth.findOne({
      where: { username: productId },
    });

    
      updatedProduct?.phone_number
        ? (product.phone_number = updatedProduct?.phone_number)
        : null;
      updatedProduct?.location
        ? (product.location = updatedProduct?.location)
        : null;
      await product.save();
      res.statusCode = 200;
      res.end(JSON.stringify("ok"));
  });
};
export const PutO = async (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk;
  });

  //put o
  req.on("end", async () => {
    const updatedProduct: any = JSON.parse(body);
    const productId = updatedProduct.id;

    const product: any = await Orders.findOne({
      where: { id: productId },
    });

    if (product) {
      updatedProduct?.auth_id
        ? (product.auth_id = updatedProduct?.auth_id)
        : null;
      updatedProduct?.product_id
        ? (product.product_id = updatedProduct?.product_id)
        : null;
      await product.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await Orders.findAll()));
      console.log(product);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Mahsulot topilmadi" }));
    }
  });
};
export const PutOC = async (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk;
  });

  //put o
  req.on("end", async () => {
    const updatedProduct: any = JSON.parse(body);
    const productId = updatedProduct.id;

    const product: any = await Orders_catigory.findOne({
      where: { id: productId },
    });

    if (product) {
      updatedProduct?.catigory_id
        ? (product.catigory_id = updatedProduct?.catigory_id)
        : null;
      updatedProduct?.product_id
        ? (product.product_id = updatedProduct?.product_id)
        : null;
      await product.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await Orders.findAll()));
      console.log(product);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Mahsulot topilmadi" }));
    }
  });
};
export const PutC = async (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk;
  });

  //put o
  req.on("end", async () => {
    const updatedProduct: any = JSON.parse(body);
    const productId = updatedProduct.id;

    const product: any = await Catigory.findOne({
      where: { id: productId },
    });

    if (product) {
      updatedProduct?.title
        ? (product.title = updatedProduct?.title)
        : null;
      await product.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await Orders.findAll()));
      console.log(product);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Mahsulot topilmadi" }));
    }
  });
};