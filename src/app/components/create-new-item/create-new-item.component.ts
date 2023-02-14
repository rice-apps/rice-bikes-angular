import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from "@angular/core";
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { SearchService } from "../../services/search.service";
import { Item } from "../../models/item";
import { Observable } from "rxjs/Observable";
import { ItemService } from "../../services/item.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-create-new-item",
  templateUrl: "create-new-item.component.html",
  styleUrls: ["create-new-item.component.css", "../../app.component.css"],
})
export class CreateNewItemComponent implements OnInit {
  // Input: if user is an employee or not
  @Input("employee") employee: boolean;
  @Input("upc") upc: string;
  @Input() modalClose: () => void;
  @Input() searchButton: TemplateRef<any>;

  // Emit this to the listening component
  @Output() newItem = new EventEmitter<Item>();

  newItemForm = this.formBuilder.group({
    name: ["", Validators.required],
    brand: ["", Validators.required],
    standard_price: ["", Validators.required],
    upc: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    category_1: ["Any", Validators.required],
    category_2: "",
    category_3: "",
    wholesale_cost: ["", Validators.required],
    specifications: this.formBuilder.array([]),
    features: this.formBuilder.array([]),
    in_stock: ["", Validators.required],
  });

  categories = this.searchService.itemCategories1();
  categories2 = this.searchService.itemCategories2();
  categories3 = null;

  brands = this.searchService.itemBrands();

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private authenticationService: AuthenticationService
  ) {}

  get specifications() {
    return this.newItemForm.controls["specifications"] as FormArray;
  }

  get features() {
    return this.newItemForm.controls["features"] as FormArray;
  }

  closeItemModal() {
    this.newItemForm.reset();
    this.modalClose();
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      key: ["", Validators.required],
      value: ["", Validators.required],
    });
  }

  ngOnInit() {
    console.log("upc", this.upc);
    this.newItemForm.patchValue({
      upc: this.upc,
    });
  }

  onCat1Change(e) {
    this.categories2 = this.searchService.itemCategories2(e.target.value);
  }

  onCat2Change(e) {
    this.categories3 = this.searchService.itemCategories3(this.newItemForm.controls["category_1"].value, e.target.value);
  }

  addSpec() {
    this.specifications.push(this.createEmpFormGroup());
  }

  removeSpec(index: number) {
    this.specifications.removeAt(index);
  }

  addFeature() {
    this.features.push(
      this.formBuilder.group({ value: ["", Validators.required] })
    );
  }

  removeFeature(index: number) {
    this.features.removeAt(index);
  }

  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    }
    else {
      this.submitItemCreateForm();
    }
  
    console.log("new item", this.newItemForm.controls);
  }

  /**
   * Submits the item creation form, and creates the item
   */
  submitItemCreateForm() {
    this.itemService
      .createItem({
        _id: "",
        name: this.newItemForm.controls["name"].value,
        upc: this.newItemForm.controls["upc"].value,
        category_1: this.newItemForm.controls["category_1"].value,
        category_2: this.newItemForm.controls["category_2"].value,
        category_3: this.newItemForm.controls["category_3"].value,
        brand: this.newItemForm.controls["brand"].value,
        standard_price: this.newItemForm.controls["standard_price"].value,
        wholesale_cost: this.newItemForm.controls["wholesale_cost"].value,
        specifications: this.newItemForm.controls[
          "specifications"
        ].value.reduce(function (map, obj) {
          map[obj.key] = obj.value;
          return map;
        }, {}),
        features: this.newItemForm.controls["features"].value.map(
          (obj) => obj.value
        ),
        in_stock: this.newItemForm.controls["in_stock"].value,
      })
      .then((res) => {
        this.newItemForm.reset();
        this.newItem.emit(res);

        console.log("item created", res);

        // add new item to transaction
      });
  }
}
