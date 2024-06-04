import { Request, Response } from "express";
import { getAllSong } from "./song.controllers";
import SongModel from "../models/song.model";

// Mock de SongModel
jest.mock("../models/song.model");

const mockRequest = (): Partial<Request> => {
  return {};
};

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getAllSong Controller", () => {
  it("should return all songs and status 200", async () => {
    const allSongs = [
      { id: 1, title: "Song1" },
      { id: 2, title: "Song2" },
    ];

    (SongModel.find as jest.Mock).mockResolvedValue(allSongs);

    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    await getAllSong(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: allSongs,
      msg: "Here are your songs!",
    });
    expect(res.json).toHaveBeenCalledWith(allSongs);
  });

  it("should return status 400 on error", async () => {
    const error = new Error("Something went wrong");

    (SongModel.find as jest.Mock).mockRejectedValue(error);

    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    await getAllSong(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(error);
  });
});
