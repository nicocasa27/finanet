-- Crear tabla de productos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sale_price NUMERIC DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla de ingredientes/insumos
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'pza',
  cost_per_unit NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla de relación productos-ingredientes
CREATE TABLE public.product_ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  quantity NUMERIC NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, ingredient_id)
);

-- Crear tabla de costos indirectos por producto
CREATE TABLE public.indirect_costs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indirect_costs ENABLE ROW LEVEL SECURITY;

-- Políticas para products
CREATE POLICY "Users can view products of own businesses"
ON public.products FOR SELECT
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = products.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can create products for own businesses"
ON public.products FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = products.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can update products of own businesses"
ON public.products FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = products.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can delete products of own businesses"
ON public.products FOR DELETE
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = products.business_id 
  AND businesses.user_id = auth.uid()
));

-- Políticas para ingredients
CREATE POLICY "Users can view ingredients of own businesses"
ON public.ingredients FOR SELECT
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = ingredients.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can create ingredients for own businesses"
ON public.ingredients FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = ingredients.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can update ingredients of own businesses"
ON public.ingredients FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = ingredients.business_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can delete ingredients of own businesses"
ON public.ingredients FOR DELETE
USING (EXISTS (
  SELECT 1 FROM businesses 
  WHERE businesses.id = ingredients.business_id 
  AND businesses.user_id = auth.uid()
));

-- Políticas para product_ingredients (basadas en el producto)
CREATE POLICY "Users can view product_ingredients of own products"
ON public.product_ingredients FOR SELECT
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = product_ingredients.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can create product_ingredients for own products"
ON public.product_ingredients FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = product_ingredients.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can update product_ingredients of own products"
ON public.product_ingredients FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = product_ingredients.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can delete product_ingredients of own products"
ON public.product_ingredients FOR DELETE
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = product_ingredients.product_id 
  AND businesses.user_id = auth.uid()
));

-- Políticas para indirect_costs (basadas en el producto)
CREATE POLICY "Users can view indirect_costs of own products"
ON public.indirect_costs FOR SELECT
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = indirect_costs.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can create indirect_costs for own products"
ON public.indirect_costs FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = indirect_costs.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can update indirect_costs of own products"
ON public.indirect_costs FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = indirect_costs.product_id 
  AND businesses.user_id = auth.uid()
));

CREATE POLICY "Users can delete indirect_costs of own products"
ON public.indirect_costs FOR DELETE
USING (EXISTS (
  SELECT 1 FROM products 
  JOIN businesses ON businesses.id = products.business_id 
  WHERE products.id = indirect_costs.product_id 
  AND businesses.user_id = auth.uid()
));

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ingredients_updated_at
BEFORE UPDATE ON public.ingredients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();