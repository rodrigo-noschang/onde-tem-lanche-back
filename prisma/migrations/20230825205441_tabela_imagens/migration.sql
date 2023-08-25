-- CreateTable
CREATE TABLE "images" (
    "image_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "restaurant_id" TEXT,
    "dish_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dishes"("dish_id") ON DELETE CASCADE ON UPDATE CASCADE;
