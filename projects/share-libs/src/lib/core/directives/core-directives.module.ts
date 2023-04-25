import { NgModule } from "@angular/core";
import { NoLeadingZerosDirective } from "./no-leading-zeros/no-leading-zeros.directive";
import { NoWhiteSpaceDirective } from "./no-white-space/no-white-space.directive";
import { UppercaseDirective } from "./to-uppercase/uppercase.directive";

@NgModule({
    declarations: [
        UppercaseDirective,
        NoWhiteSpaceDirective,
        NoLeadingZerosDirective,
    ],
    exports: [
        UppercaseDirective,
        NoWhiteSpaceDirective,
        NoLeadingZerosDirective,
    ]
})
export class CoreDirectivesModule {}
