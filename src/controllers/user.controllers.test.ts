import { Request, Response } from "express";
import UserModel from "../models/user.models";
import { getAllUser } from "./user.controllers";

jest.mock("../models/user.models");

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

describe("getAllUser Controller", () => {
  it("should return all users and status 200", async () => {
    const allUsers = [
      { id: 1, name: "User1" },
      { id: 2, name: "User2" },
    ];

    (UserModel.find as jest.Mock).mockResolvedValue(allUsers);

    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    await getAllUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: allUsers,
      //   type: "array",
      msg: "Here are your users!",
    });
  });

  it("should return status 400 on error", async () => {
    const error = new Error("Something went wrong");

    (UserModel.find as jest.Mock).mockRejectedValue(error);

    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    await getAllUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(error);
  });
});
