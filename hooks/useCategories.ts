export function useCatagories(posts: any, categories: any, category: any) {
  const links = posts.filter((post: any, index: number) => {
    const catArr = post.properties.Category.multi_select.map((item: any) => item.name);

    if (catArr.includes(categories[category]) || category === 0) {
      return true;
    } else {
      return false;
    }
  });

  return links;
}