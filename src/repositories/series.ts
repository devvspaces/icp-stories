import { v4 as uuidv4 } from "uuid";
import { now } from "../helpers/date";
import { Series } from "../types";
import { BSeries } from "../models";
import { NotFoundException } from "../helpers/errors";
import { CreateSeriesDto, UpdateSeriesDto } from "../validators/series";

export default class SeriesRepository {
  static list() {
    return BSeries.values();
  }

  static listByBlog(id: string) {
    return BSeries.values().filter((series) => series.blogId === id);
  }

  static listByUserId(id: string) {
    return BSeries.values().filter((series) => series.userId === id);
  }

  static create(userId: string, data: CreateSeriesDto) {
    const series: Series = {
      id: uuidv4(),
      userId,
      createdAt: now(),
      updatedAt: now(),
      posts: [],
      ...data,
    };
    BSeries.insert(series.id, series);
  }

  static get(id: string) {
    const series = BSeries.get(id);
    if ("None" in series) {
      throw new NotFoundException("Series not found");
    }
    return series.Some;
  }

  static update(id: string, data: UpdateSeriesDto) {
    const series = BSeries.get(id);
    if ("None" in series) {
      throw new NotFoundException("Series not found");
    }
    const updated = {
      ...series.Some,
      ...data,
      updatedAt: now(),
    };
    BSeries.insert(updated.id, updated);
    return updated;
  }

  static delete(id: string) {
    const obj = BSeries.remove(id);
    if ("None" in obj) {
      throw new NotFoundException("Series not found");
    }
    return obj.Some;
  }
}
