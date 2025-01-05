import { getRecommendedMovies, approveMovie, rejectMovie } from "../index";
import { fetchMoviesFromDB, handleProcessingMovieAction } from "../utils";

jest.mock("../utils", () => ({
	fetchMoviesFromDB: jest.fn(),
	handleProcessingMovieAction: jest.fn(),
}));

describe("Movies Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getRecommendedMovies", () => {
		it("should return movies from first page", async () => {
			const mockMovies = [
				{ id: "1", title: "Film 1" },
				{ id: "2", title: "Film 2" },
			];

			(fetchMoviesFromDB as jest.Mock).mockResolvedValueOnce(mockMovies);

			const result = await getRecommendedMovies({ limit: 2 });

			expect(result).toEqual({
				data: mockMovies,
				cursor: "2",
			});
			expect(fetchMoviesFromDB).toHaveBeenCalledWith(null, 2, [], undefined);
		});

		it("should handle fetching multiple pages when first page has insufficient results", async () => {
			(fetchMoviesFromDB as jest.Mock)
				.mockResolvedValueOnce([{ id: "1", title: "Film 1" }])
				.mockResolvedValueOnce([{ id: "2", title: "Film 2" }]);

			const result = await getRecommendedMovies({ limit: 2 });

			expect(result).toEqual({
				data: [
					{ id: "1", title: "Film 1" },
					{ id: "2", title: "Film 2" },
				],
				cursor: null,
			});
		});

		it("should handle fetch error", async () => {
			const error = new Error("Fetch error");
			(fetchMoviesFromDB as jest.Mock).mockRejectedValueOnce(error);

			await expect(getRecommendedMovies({ limit: 2 })).rejects.toThrow(error);
		});
	});

	describe("approveMovie", () => {
		it("should approve movie successfully", async () => {
			const mockResponse = { success: true };
			(handleProcessingMovieAction as jest.Mock).mockResolvedValueOnce(
				mockResponse
			);

			const result = await approveMovie("123");

			expect(result).toEqual(mockResponse);
			expect(handleProcessingMovieAction).toHaveBeenCalledWith(
				"123",
				"approve"
			);
		});
	});

	describe("rejectMovie", () => {
		it("should reject movie successfully", async () => {
			const mockResponse = { success: true };
			(handleProcessingMovieAction as jest.Mock).mockResolvedValueOnce(
				mockResponse
			);

			const result = await rejectMovie("123");

			expect(result).toEqual(mockResponse);
			expect(handleProcessingMovieAction).toHaveBeenCalledWith("123", "reject");
		});
	});
});
