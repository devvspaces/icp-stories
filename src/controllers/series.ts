import { withErrorHandling } from "../helpers/errorHandler";
import SeriesRepository from "../repositories/series";
import { CreateSeriesDto, UpdateSeriesDto } from "../validators/series";

export const createSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.create(req.params.userId, CreateSeriesDto.fromPlain(req.body)));
});

export const getSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.get(req.params.id));
});

export const all = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.list());
});

export const deleteSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.delete(req.params.id));
});

export const updateSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.update(req.params.id, UpdateSeriesDto.fromPlain(req.body)));
});

export const listUserSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.listByUserId(req.params.userId));
});

export const listBlogSeries = withErrorHandling(async (req, res) => {
  res.json(SeriesRepository.listByBlog(req.params.blogId));
});
