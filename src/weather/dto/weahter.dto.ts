import { IsString } from "class-validator";

export class WeatherDto{
   @IsString()
   readonly latitude:string

   @IsString()
   readonly longitude:string
}