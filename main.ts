import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map();
books.set("1", {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur",
});

const requrl = "https://raspberry.superbest.wang:1443";
const router = new Router();
router.get("/", async (context) => {
    const response = await fetch(requrl);
    let data = await response.json()
    context.response.body = data;
})

router.get("/book", async (context) => {
    context.response.body = Array.from(books.values());
})

router.get("/book/:id", async (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
        context.response.body = books.get(context.params.id);
    }
});




const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());


app.listen({ port: 8000 });
console.log(`server listen ---->>> 8000`)

