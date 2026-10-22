const SUPABASE_URL = "https://ywvvtshorywusztncmsw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_quWNwMkVPhCrjNEVlKjRqg_1mBS90c7";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_active", true);

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }
  return data;
}

loadProducts().then((products) => console.log("Products:", products));
