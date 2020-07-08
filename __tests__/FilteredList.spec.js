import { parsedItems } from "../utils";

describe("Filtered List", () => {
  it("should filter list with [8, 9, 10, 15, 16, 18, 19, 20, 23]", async () => {
    const listApi = [8, 9, 10, 15, 16, 18, 19, 20, 23];
    const listExpect = [
      { max: "09:00", min: "08:00" },
      { max: "10:00", min: "09:00" },
      { max: "16:00", min: "15:00" },
      { max: "19:00", min: "18:00" },
      { max: "20:00", min: "19:00" },
    ];
    const listFiltered = await parsedItems(listApi);

    expect(listFiltered).toEqual(listExpect);
  });
  it("should filter list with [8, 10, 15, 17, 18, 19, 20, 23, 26, 28]", async () => {
    const listApi = [8, 10, 15, 17, 18, 19, 20, 23, 26, 28];
    const listExpect = [
      { max: "18:00", min: "17:00" },
      { max: "19:00", min: "18:00" },
      { max: "20:00", min: "19:00" },
    ];
    const listFiltered = await parsedItems(listApi);

    expect(listFiltered).toEqual(listExpect);
  });
  it("should filter list with ", async () => {
    const listApi = [6, 7, 8, 10, 15, 17, 18, 19, 20];
    const listExpect = [
      { max: "07:00", min: "06:00" },
      { max: "08:00", min: "07:00" },
      { max: "18:00", min: "17:00" },
      { max: "19:00", min: "18:00" },
      { max: "20:00", min: "19:00" },
    ];
    const listFiltered = await parsedItems(listApi);

    expect(listFiltered).toEqual(listExpect);
  });
});
