import { Controller, Get, Query } from "@nestjs/common";
import { QuoteService } from "./quote.service";

@Controller()
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get("/quotes")
  getAllQuotes(@Query('author') author: string | undefined) {
    return this.quoteService.getQuotes(author);
  }

  @Get("/quotes/random")
  getRandomQuote() {
    return this.quoteService.getRandomQuote();
  }
}
