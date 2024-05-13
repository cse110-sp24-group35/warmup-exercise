const puppeteer = require('puppeteer');
const Fastify = require('fastify');
const staticPlugin = require('@fastify/static');
const path = require('path');
const { expect } = require('chai');

describe("Sentiment widget", () => {
    let browser;
    let page;
    let server;

    const fastify = new Fastify();

    before(async function () {
        this.timeout(10000);

        fastify.register(staticPlugin, {
            root: path.join(__dirname, "../../")
        });

        server = fastify;
        await server.listen({
            port: 4321
        });

        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
        await page.goto("http://localhost:4321/index.html");
    });

    after(async () => {
        await browser.close();
        await server.close();
    });

    it("Header should say Coding Kittens", async function () {
        this.timeout(10000);

        await page.waitForSelector("h1");
        const heading = await page.$eval("h1", node => node.innerText);

        expect(heading).equal("Coding Kittens");
    });
});