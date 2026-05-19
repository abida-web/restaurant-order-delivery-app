import { details, relatedItems } from "@/actions/menu-action";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const Details = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const menuItem = await details(id);
  const relatedItemsList = await relatedItems(menuItem?.category.id);
  if (!menuItem) {
    return (
      <div className="pt-5 px-10 text-center">
        <p className="text-gray-500">Menu item not found</p>
      </div>
    );
  }

  return (
    <div className="pt-5 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <img
          className="w-full h-[400px] object-cover rounded-lg"
          src={menuItem.imageUrl}
          alt={menuItem.name}
        />
        <div className="flex flex-col mt-10">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-5xl font-semibold">{menuItem.name}</h1>
            <p className="bg-amber-500/20 px-3 py-1 rounded-full text-sm">
              {menuItem.category.name}
            </p>
          </div>
          <p className="mt-2 text-gray-400 leading-relaxed">
            {menuItem.description}
          </p>
          <p className="py-4 text-3xl font-semibold text-amber-500">
            AFN {menuItem.price}
          </p>
          <p
            className={`py-1 px-4 w-fit rounded-full ${
              menuItem.isAvaliable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {menuItem.isAvaliable ? "Available" : "Not Available"}
          </p>
          <div className="flex items-center gap-3 mt-5">
            <Button variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <h1 className=" py-5 text-3xl text-amber-500">Related Items</h1>
      <div className="flex overflow-x-auto gap-5 pb-4">
        {relatedItemsList.map((item, index: number) => (
          <ItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Details;
