const postM =(req:any,res:any) => {
      let data = "";
      req.on("data", (chunk: any) => {
        data += chunk;
      });
      req.on("end", () => {
        // data o'zida req.body bo'ladi
         const body = JSON.parse(data);

        // Endi body o'zida kerakli ma'lumotlarni ishlatishingiz mumkin
if (!body.price || !body.category_Name || !body.ramka || !body.tavsiya) {
}
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      });
}
